import _ from 'lodash';
import moment from 'moment';
import { Box, Button, Container, FormControl, HStack, Input, Text } from 'native-base';
import React, { useState, useEffect, useContext } from 'react';
import { ScrollView } from 'react-native';

// custom components and helper files
import { LoadingSpinner } from '../../../components/loadingSpinner';
import { userContext } from '../../../context/user';
import { getTermFromDictionary } from '../../../translations/TranslationService';
import { addAppliedFilter } from '../../../util/search';

const Facet_Year = ({ data, category, updater, language }) => {
     const user = useContext(userContext);
     const [isLoading, setIsLoading] = useState(true);
     const [yearFrom, setYearFrom] = useState('');
     const [yearTo, setYearTo] = useState('');
     const [value, setValue] = useState('');

     useEffect(() => {
          setIsLoading(false);
     }, []);

     const _updateYearTo = (jump) => {
          const jumpTo = moment().subtract(jump, 'years');
          const year = moment(jumpTo).format('YYYY');
          setYearFrom(year);
          setYearTo('*');
          const years = '[' + year + '+TO+*]';
          setValue(years);
          addAppliedFilter(category, years, false);
          updater(category, years);
     };

     const updateValue = (type, newValue) => {
          if (type === 'yearFrom') {
               setYearFrom(newValue);
          } else {
               setYearTo(newValue);
          }

          if (_.size(newValue) === 4) {
               updateFacet(type === 'yearFrom' ? newValue : yearFrom, type === 'yearTo' ? newValue : yearTo);
          }
     };

     const updateFacet = (from = yearFrom, to = yearTo) => {
          let fromValue = from;
          let toValue = to;
          if (_.isEmpty(from)) {
               fromValue = '*';
          }
          if (_.isEmpty(to)) {
               toValue = '*';
          }
          const years = '[' + fromValue + '+TO+' + toValue + ']';
          addAppliedFilter(category, years, false);
          updater(category, years);
     };

     if (isLoading) {
          return <LoadingSpinner />;
     }

     return (
          <ScrollView>
               <Box safeArea={5}>
                    <FormControl mb={2}>
                         <HStack space={3} justifyContent="center">
                              <Input
                                   size="lg"
                                   placeholder={getTermFromDictionary(language, 'year_from')}
                                   accessibilityLabel={getTermFromDictionary(language, 'year_from')}
                                   value={yearFrom}
                                   onChangeText={(value) => {
                                        updateValue('yearFrom', value);
                                   }}
                                   w="50%"
                                   _dark={{
                                        color: 'muted.50',
                                        borderColor: 'muted.50',
                                   }}
                              />
                              <Input
                                   size="lg"
                                   placeholder={getTermFromDictionary(language, 'year_to')}
                                   accessibilityLabel={getTermFromDictionary(language, 'year_to')}
                                   onChangeText={(value) => {
                                        updateValue('yearTo', value);
                                   }}
                                   w="50%"
                                   _dark={{
                                        color: 'muted.50',
                                        borderColor: 'muted.50',
                                   }}
                              />
                         </HStack>
                    </FormControl>
                    {category === 'publishDate' || category === 'publishDateSort' ? (
                         <Container>
                              <Text _light={{ color: 'darkText' }} _dark={{ color: 'lightText' }}>
                                   {getTermFromDictionary(language, 'published_in_the_last')}
                              </Text>
                              <Button.Group variant="subtle">
                                   <Button onPress={() => _updateYearTo(1)}>{getTermFromDictionary(language, 'year')}</Button>
                                   <Button onPress={() => _updateYearTo(5)}>5 {getTermFromDictionary(language, 'years')}</Button>
                                   <Button onPress={() => _updateYearTo(10)}>10 {getTermFromDictionary(language, 'years')}</Button>
                              </Button.Group>
                         </Container>
                    ) : null}
               </Box>
          </ScrollView>
     );
};

export default Facet_Year;
