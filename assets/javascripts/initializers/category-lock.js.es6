import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "category-lock",

  initialize() {
    if(!Discourse.SiteSettings.category_lock_enabled) {
      return
    }

    withPluginApi("0.8.31", (api) => {
      function categoryLocked(topic) {
        const user = api.getCurrentUser()

        return user
          && topic
          && topic.category
          && topic.category.category_lock
          && topic.user_id === user.id
          && user.trust_level <= Discourse.SiteSettings.category_lock_max_trust_level
      }

      api.modifyClass("controller:topic", {
        showCategoryChooser: function() {
          return !categoryLocked(this.model) && this._super()
        }.property()
      })

      api.modifyClass("model:composer", {
        showCategoryChooser: function(isPrivateMessage, hasOptions) {
          return !categoryLocked(this.topic) && this._super(isPrivateMessage, hasOptions)
        }.property()
      })
    })
  }
}
