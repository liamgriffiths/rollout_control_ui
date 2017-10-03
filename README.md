# Rollout Control UI

Super simple web UI for controlling (rollout)[#] feature flags.

## Setup

...

Add these environment variables to the app.

```
BASIC_AUTH_USERNAME=...
BASIC_AUTH_PASSWORD=...
REDIS_URL=...
```


## Development

...

```bash
# Run the React app (with the webpack dev server at http://localhost:3000)
$ rake start:react

# Run the rails-api server (runs at http://localhost:3001)
$ rake start:rails

# Develop react components with Storybook - open in the browser to http://localhost:9009
$ rake start:storybook
```

All these development servers will auto-restart when you make changes. Another cool thing
is that the React app and Storybook both proxy network requests to port `3001`, so they can
make requests to the rails api.

## Credits

* Rollout Gem
* Rollout Control Gem
* create-react-app
* storybook
* tachyons

## Contributing

Feel welcome to open issues, make pull request, or fork and do what you like. :victory:
