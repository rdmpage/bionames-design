ignore /\/_.*/
ignore /Gemfile.*/
ignore /.*\.psd$/

layout 'layout.html.erb'

before /.*\.html\.erb/ do

  begin
    base = File.basename(@_stasis.path)
    @title = base.split(".").first.titleize # "taxon.html.erb" => "Taxon"
  rescue
  end
end