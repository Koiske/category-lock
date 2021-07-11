# name: category-lock
# version: 1.0.0
# authors: boyned/Kampfkarren

enabled_site_setting :category_lock_enabled

after_initialize do
  require_dependency "category"

  Site.preloaded_category_custom_fields << "category_lock"

  register_category_custom_field_type("category_lock", :boolean)

  class ::Category
    def category_lock
      self.custom_fields["category_lock"]
    end
  end

  add_to_serializer(:basic_category, :category_lock) { object.category_lock }
end
