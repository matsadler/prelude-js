require "rake/clean"

CLOBBER.include("README.md")

desc "generate documentation"
task :doc => "README.md"

file "README.md" => "prelude.js" do |task|
  File.open(task.name, "w") do |out|
    task.prerequisites.each do |prerequisite|
      File.open(prerequisite, "r") do |input|
        input.each_line {|line| out << line[3..-1] if line =~ %r{// }}
      end
    end
  end
end
