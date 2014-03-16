require 'yaml'

desc "Check environment"
task "env" do
  file = YAML.load_file('config.yml')
  if file[:store] == 'zoraab-dev.myshopify.com'
    puts "You are in Development"
  end
  if file[:store] == 'zoraab.myshopify.com'
    puts "You are in Production"
  end
end

desc "Switch to Production"
task "prod" do
  file = YAML.load_file('config.yml')
  file[:api_key] = '3464138cbf4f812cfeb8fef6390b3a90'
  file[:password] = '9b4e91cf988465de41c7d3906115f4ab'
  file[:store] = 'zoraab.myshopify.com'
  File.open('config.yml','w') {|f| f.write file.to_yaml}
  puts "Successfully switched to Production"
end

desc "Switch to Development"
task "dev" do
  file = YAML.load_file('config.yml')
  file[:api_key] = 'ee398b05ed761c4b6bc5938dee209366'
  file[:password] = 'eeabb470c3069fbd45c172c13d7cffb7'
  file[:store] = 'zoraab-dev.myshopify.com'
  File.open('config.yml','w') {|f| f.write file.to_yaml}
  puts "Successfully switched to Development"
end
