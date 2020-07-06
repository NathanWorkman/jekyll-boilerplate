module Jekyll
  module Sanitizer
    def sanitize_filename(name)
      if(name.is_a? Integer)
        return name.to_s
      end
      return name.tr(
  "ÀÁÂÃÄÅàáâãäåĀāĂăĄąÇçĆćĈĉĊċČčÐðĎďĐđÈÉÊËèéêëĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħÌÍÎÏìíîïĨĩĪīĬĭĮįİıĴĵĶķĸĹĺĻļĽľĿŀŁłÑñŃńŅņŇňŉŊŋÑñÒÓÔÕÖØòóôõöøŌōŎŏŐőŔŕŖŗŘřŚśŜŝŞşŠšſŢţŤťŦŧÙÚÛÜùúûüŨũŪūŬŭŮůŰűŲųŴŵÝýÿŶŷŸŹźŻżŽž",
  "AAAAAAaaaaaaAaAaAaCcCcCcCcCcDdDdDdEEEEeeeeEeEeEeEeEeGgGgGgGgHhHhIIIIiiiiIiIiIiIiIiJjKkkLlLlLlLlLlNnNnNnNnnNnNnOOOOOOooooooOoOoOoRrRrRrSsSsSsSssTtTtTtUUUUuuuuUuUuUuUuUuUuWwYyyYyYZzZzZz"
).downcase.strip.gsub(' ', '-').gsub(/[^\w.-]/, '')
    end
  end

  class DataPage < Page
    include Sanitizer
    def initialize(site, base, index_files, dir, page_data_prefix, data, name, name_expr, title, title_expr, template, extension, paginatehook)
      @site = site
      @base = base
      if name_expr
        record = data
        raw_filename = eval(name_expr)
        if raw_filename == nil
          puts "error (datapage_gen). name_expr '#{name_expr}' generated an empty value in record #{data}"
          return
        end
      else
        raw_filename = data[name]
        if raw_filename == nil
          puts "error (datapage_gen). empty value for field '#{name}' in record #{data}"
          return
        end
      end

      if title_expr
        record = data
        raw_title = eval(title_expr)
        if raw_title == nil
          puts "error (datapage_gen). title_expr '#{title_expr}' generated an empty value in record #{data}"
          return
        end
      else
        raw_title = data[title]
        if raw_title == nil
          raw_title = raw_filename
        end
      end

      filename = sanitize_filename(raw_filename).to_s

      @dir = dir + (index_files ? "/" + filename + "/" : "")
      @name = (index_files ? "index" : filename) + "." + extension.to_s

      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), template + ".html")
      self.data['title'] = raw_title

      if (paginatehook == true) && self.data['pagination']
        if self.data['pagination']['tag']
          paginatortag = self.data['pagination']['tag']
          if paginatortag
            self.data['pagination']['tag'] = paginatortag.sub(':genname', data[name])
          end
        end
      end

      if page_data_prefix
        self.data[page_data_prefix] = data
      else
        if data.key?('name')
          data['_name'] = data['name']
        end
        self.data.merge!(data)
      end
    end
  end

  class JekyllDatapageGenerator < Generator
    safe true

    def generate(site)
      index_files = site.config['page_gen-dirs'] == true
      data = site.config['page_gen']
      if data
        data.each do |data_spec|
          index_files_for_this_data = data_spec['index_files'] != nil ? data_spec['index_files'] : index_files
          template         = data_spec['template'] || data_spec['data']
          name             = data_spec['name']
          name_expr        = data_spec['name_expr']
          title            = data_spec['title']
          title_expr       = data_spec['title_expr']
          dir              = data_spec['dir'] || data_spec['data']
          extension        = data_spec['extension'] || "html"
          page_data_prefix = data_spec['page_data_prefix']
          paginatehook     = data_spec['paginatehook']

          if site.layouts.key? template
            records = nil
            data_spec['data'].split('.').each do |level|
              if records.nil?
                records = site.data[level]
              else
                records = records[level]
              end
            end
            if (records.kind_of?(Hash))
              records = records.values
            end
            records = records.select { |r| r[data_spec['filter']] } if data_spec['filter']
            records = records.select { |record| eval(data_spec['filter_condition']) } if data_spec['filter_condition']

            records.each do |record|
              site.pages << DataPage.new(site, site.source, index_files_for_this_data, dir, page_data_prefix, record, name, name_expr, title, title_expr, template, extension, paginatehook)
            end
          else
            puts "error (datapage_gen). could not find template #{template}" if not site.layouts.key? template
          end
        end
      end
    end
  end

  module DataPageLinkGenerator
    include Sanitizer
    def datapage_url(input, dir)
      extension = @context.registers[:site].config['page_gen-dirs'] ? '/' : '.html'
      "#{dir}/#{sanitize_filename(input)}#{extension}"
    end
  end

end

Liquid::Template.register_filter(Jekyll::DataPageLinkGenerator)
