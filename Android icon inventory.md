# Android icon inventory

The app now includes the complete launcher resource set:

- `mipmap-mdpi`, `mipmap-hdpi`, `mipmap-xhdpi`, `mipmap-xxhdpi`, and `mipmap-xxxhdpi`
  - `ic_launcher.png`
  - `ic_launcher_round.png`
- `mipmap-anydpi-v26`
  - `ic_launcher.xml` adaptive icon
  - `ic_launcher_round.xml` adaptive round icon
- `drawable/ic_launcher_foreground.xml` adaptive-icon foreground
- `values/colors.xml`, `values/strings.xml`, and `values/themes.xml`
- `values-night/themes.xml`

The manifest uses `@mipmap/ic_launcher` and `@mipmap/ic_launcher_round`, so Android selects the correct density or adaptive resource automatically.
