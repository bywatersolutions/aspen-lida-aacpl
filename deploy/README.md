# Essential configurations
Copy `app.json.example` to `app.json` and fill in the values.  These are not secret, and are safe to commit to GitHub.

- *name*: Name of the app as it should appear in the stores (30 char limit)
- *slug*: shortname/unique identifier for this implementation
- *easId*: Expo Project ID
- *reverseDns*: reverse of Aspen Discovery URL
- *discoveryUrl*: Aspen Discovery URL
- *greenhouseUrl*: Should be the same as Aspen Discovery URL unless using an external Greenhouse
- *libraryId*: the id of Library from Aspen Discovery settings
- *themeId*: the id of the Theme from Aspen Discovery settings
- *background*: Hex value for the color to use as a background color (e.g. '#FFFFFF' for white)
- *sentryProject*: Project name created in Sentry for the app
- *sentryDsn*: Sentry DSN URL for this project
- *ascAppId*: Apple ID for the App (once created)
- *logLevel*: Log level to use (default 0)

# Required Secrets
Add these secrets to your GitHub repository settings:

## Aspen Secrets
**API_KEY_1**: API KEY 1 as defined in your Greenhouse (should be same as Aspen Discovery in most all cases)
**API_KEY_2**: API KEY 2 as defined in your Greenhouse
**API_KEY_3**: API KEY 3 as defined in your Greenhouse
**API_KEY_4**: API KEY 4 as defined in your Greenhouse
**API_KEY_5**: API KEY 5 as defined in your Greenhouse

## Expo Secrets
**EXPO_TOKEN**: Your Expo account token
**EXPO_APPLE_ID**: Your Apple Developer account email
**EXPO_APPLE_PASSWORD**: Your Apple Developer account password or app-specific password
**EXPO_TEAM_ID**: Your Apple Developer Team ID

## Sentry Secrets
**SENTRY_AUTH_TOKEN**: Auth Token for Sentry.io (error reporting)

## Google Secrets
**GOOGLE_PLAY_SERVICE_ACCOUNT**: Google Play service account JSON (base64 encoded)
**GOOGLE_API_KEY_ANDROID**: Your Google API Key for Android
**GOOGLE_API_KEY_APPLE**: Your Google API Key for Apple

## Slack Secrets
**SLACK_WEBHOOK**: Slack webhook URL for notifications (optional)

# Fetching the latest code
Ideally, you should be reading this in a forked repo from bywatersolutions/aspen-lida.  You can pull the latest code in a few ways:
 - Through the GitHub UI
 - using the provided workflow, upstream-sync
   - run manually in GitHub Actions
   - scheduled (default is Feb 1st at midnight UTC, but you can make that more frequent)

# Triggering a Build
Builds can be run manually, but are automatically triggered whenever changes to build.json are found on the main/master branch.

**Important Note**: while it is possible to submit multiple builds with the same version BEFORE publication, once an app has been published within the store, further builds will need an incremented version number (found in `/version.json`) to be accepted.

