# Plugin: `category-lock`

Prevents users under a certain trust level from editing topics out of specific target categories.

---

## Features

- Adds a setting on each category that, when enabled, prevents trust levels lower than a certain threshold (defined by settings) from editing topics out of the category.

  - On the front-end, when the user attempts editing the topic, the category picker will not be present.

  - No server-side validation or restriction is performed yet.

  - Users can still edit topics *into* the categories affected by this plugin.

---

## Impact

### Community

Low trust level users will be prevented from moving topics out of certain categories, such as Bulletin Board or Recruitment.

This is good, because these categories have lock timers or other specific properties that make it undesirable for these topics to be moved out of these categories after having been in there. If we would allow users to move topics out of these categories, we would end up with random locked posts in other categories, since users cannot remove lock timers themselves.

### Internal

Users can no longer deface categories by moving auto-locked topics from a category that has lock timers to one that does not, which saves on forum moderation workload.

### Resources

Highly negligible performance impact when querying information about categories.

### Maintenance

No manual maintenance needed.

---

## Technical Scope

The plugin uses standard recommended functionality for extending category settings.

On the front-end, it uses the official plugin API to modify the properties of the front-end that determine whether the category chooser should be shown when editing a topic. This is unlikely to break throughout Discourse updates.

---

## Configuration

The `category_lock_max_trust_level` determines the maximum trust level for which the functionality of the plugin applies.
