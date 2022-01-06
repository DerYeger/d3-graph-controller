## [1.13.2](https://github.com/DerYeger/d3-graph-controller/compare/v1.13.1...v1.13.2) (2022-01-06)


### Bug Fixes

* **marker:** use `userSpaceOnUse` as `markerUnits` ([bd146d7](https://github.com/DerYeger/d3-graph-controller/commit/bd146d71883ab5258b47943d36864f991e8aa2e9))

## [1.13.1](https://github.com/DerYeger/d3-graph-controller/compare/v1.13.0...v1.13.1) (2022-01-05)


### Bug Fixes

* **config:** do not use `any` type ([4de3194](https://github.com/DerYeger/d3-graph-controller/commit/4de31949901dd44711493702e73d36e5b8a3268a))

# [1.13.0](https://github.com/DerYeger/d3-graph-controller/compare/v1.12.0...v1.13.0) (2022-01-05)


### Bug Fixes

* **nodes:** only trigger `onNodeSelected` if double-clicked ([68841e3](https://github.com/DerYeger/d3-graph-controller/commit/68841e3e491e7b112efbfe9a71946c9346fa2edf))


### Features

* **config:** expose low-level modifier for nodes ([7742d34](https://github.com/DerYeger/d3-graph-controller/commit/7742d34e4259b4cc8da7a2bb54fa5a54951d1cee))

# [1.12.0](https://github.com/DerYeger/d3-graph-controller/compare/v1.11.0...v1.12.0) (2022-01-05)


### Features

* **config:** add configurable `nodeSelected` callback ([c7eb223](https://github.com/DerYeger/d3-graph-controller/commit/c7eb223197c51266d66386b0373a9098985b0139))

# [1.11.0](https://github.com/DerYeger/d3-graph-controller/compare/v1.10.1...v1.11.0) (2022-01-05)


### Features

* **config:** make resize alpha configurable by context ([e940f53](https://github.com/DerYeger/d3-graph-controller/commit/e940f5304a99899b18f3d46590be3f16912e9f3a))

## [1.10.1](https://github.com/DerYeger/d3-graph-controller/compare/v1.10.0...v1.10.1) (2022-01-03)


### Bug Fixes

* **deps:** update dependency vecti to v2.0.0 ([0cea900](https://github.com/DerYeger/d3-graph-controller/commit/0cea9008642cd37917025eeea8e8c842875eaaae))

# [1.10.0](https://github.com/DerYeger/d3-graph-controller/compare/v1.9.0...v1.10.0) (2022-01-01)


### Features

* **config:** make alpha for resizing configurable ([aaf6010](https://github.com/DerYeger/d3-graph-controller/commit/aaf6010939c93e95f0bdc60caee925cf3bee571e))

# [1.9.0](https://github.com/DerYeger/d3-graph-controller/compare/v1.8.1...v1.9.0) (2022-01-01)


### Features

* **config:** make alpha values configurable ([b5e0d81](https://github.com/DerYeger/d3-graph-controller/commit/b5e0d81a4e270269d539ef13f49d1ca959903ba4))

## [1.8.1](https://github.com/DerYeger/d3-graph-controller/compare/v1.8.0...v1.8.1) (2021-12-30)


### Bug Fixes

* **deps:** update dependency vecti to v1.0.2 ([4f15890](https://github.com/DerYeger/d3-graph-controller/commit/4f15890c1baf53989eef42b7f87261575b14ab09))

# [1.8.0](https://github.com/DerYeger/d3-graph-controller/compare/v1.7.0...v1.8.0) (2021-12-29)


### Features

* **paths:** replace `ts-matrix` with `vecti` ([b61e394](https://github.com/DerYeger/d3-graph-controller/commit/b61e394feb0430c546a5afcb5299449cde7676a9))
* **paths:** use custom svg line builder ([5461c1b](https://github.com/DerYeger/d3-graph-controller/commit/5461c1b06acc8ae4120b107f637812469210fdb0))

# [1.7.0](https://github.com/DerYeger/d3-graph-controller/compare/v1.6.0...v1.7.0) (2021-12-29)


### Features

* **paths:** replace `ml-matrix` with `ts-matrix` ([0887b53](https://github.com/DerYeger/d3-graph-controller/commit/0887b53045dc6da1763d7c9da678e115a85e3e44))

# [1.6.0](https://github.com/DerYeger/d3-graph-controller/compare/v1.5.0...v1.6.0) (2021-12-28)


### Bug Fixes

* **config:** merge arrays in config ([d7ebc7f](https://github.com/DerYeger/d3-graph-controller/commit/d7ebc7fea5e659255627aded08648e9a3feffb87))


### Features

* **config:** deep-merge config with default config ([ae65c38](https://github.com/DerYeger/d3-graph-controller/commit/ae65c38adddcebfc6aab495113fa51724dbb17ec))


### Performance Improvements

* **style:** remove shadow filter from default theme ([3316e44](https://github.com/DerYeger/d3-graph-controller/commit/3316e44c0350d659af89ee4ed7c0a7683311fe31))

# [1.5.0](https://github.com/DerYeger/d3-graph-controller/compare/v1.4.0...v1.5.0) (2021-12-28)


### Features

* make location initialization configurable ([2791ec4](https://github.com/DerYeger/d3-graph-controller/commit/2791ec46a3a11c1339c5eb1724a633566053a45d))

# [1.4.0](https://github.com/DerYeger/d3-graph-controller/compare/v1.3.0...v1.4.0) (2021-12-28)


### Features

* **config:** make `markerConfig` part of `GraphConfig` ([694f4ad](https://github.com/DerYeger/d3-graph-controller/commit/694f4adf33d3dd8c03b86d31c325a833642ef369)), closes [#2](https://github.com/DerYeger/d3-graph-controller/issues/2)

# [1.3.0](https://github.com/DerYeger/d3-graph-controller/compare/v1.2.0...v1.3.0) (2021-12-27)


### Features

* make all colors of `default.css` configurable via variables ([19436d3](https://github.com/DerYeger/d3-graph-controller/commit/19436d3237a8bc94addb28dc43927fbc94c44bc7)), closes [#3](https://github.com/DerYeger/d3-graph-controller/issues/3)

# [1.2.0](https://github.com/DerYeger/d3-graph-controller/compare/v1.1.0...v1.2.0) (2021-12-23)


### Features

* **simulation:** make collision force radius multiplier configurable ([9f10136](https://github.com/DerYeger/d3-graph-controller/commit/9f10136b063e181bf3fad5d3e7e9a48ee7bc8cea))

# [1.1.0](https://github.com/DerYeger/d3-graph-controller/compare/v1.0.0...v1.1.0) (2021-12-23)


### Features

* **model:** improve helper methods ([9320d78](https://github.com/DerYeger/d3-graph-controller/commit/9320d785c79ac0980bde50dcf5290f802c209670))
* **simulation:** improve default force configuration ([a7e2fde](https://github.com/DerYeger/d3-graph-controller/commit/a7e2fde48f2db81f42e24b9c27259a53a8b1858c))
* **style:** disable touch callout for all elements in graph ([2925c80](https://github.com/DerYeger/d3-graph-controller/commit/2925c807f243589ee965f32204eea96377be76f9))

# 1.0.0 (2021-12-22)


### Features

* create project ([9b3c4d4](https://github.com/DerYeger/d3-graph-controller/commit/9b3c4d482ac43e13c63cb67bd1baf50c30fe7e03))
