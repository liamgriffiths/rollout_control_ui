$rollout = Rollout.new($redis)

RolloutControl.configure do |rc|
  rc.rollout = $rollout

  rc.basic_auth_username = ENV['BASIC_AUTH_USERNAME'] || 'admin'
  rc.basic_auth_password = ENV['BASIC_AUTH_PASSWOR'] || 'password'
end
