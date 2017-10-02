namespace :start do
  desc 'Run in development mode'
  task :development do
    exec 'foreman start -f Procfile.dev'
  end

  desc 'Run in production mode'
  task :production do
    exec 'NPM_CONFIG_PRODUCTION=true npm run postinstall && foreman start'
  end

  desc 'Run storybook for react component dev'
  task :storybook do
    exec 'cd client && npm run storybook'
  end

  desc 'Run rails api server'
  task :rails do
    exec 'PORT=3001 rails s'
  end

  desc 'Run react-app development server'
  task :react do
    exec 'cd client && npm start'
  end
end

desc 'Start development server'
task :start => 'start:development'

