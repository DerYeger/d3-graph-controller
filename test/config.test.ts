import { defineGraphConfig } from 'src/config/config'
import { describe, expect, it } from 'vitest'

describe.concurrent('Config', () => {
  describe('can be defined', () => {
    it('using default values', () => {
      const config = defineGraphConfig()
      expect(config).toMatchSnapshot()
    })

    it('with deep merging', () => {
      const defaultConfig = defineGraphConfig()
      const customConfig = defineGraphConfig({
        simulation: {
          forces: {
            collision: {
              radiusMultiplier: 42,
            },
          },
        },
      })
      expect(customConfig.simulation.forces.collision.radiusMultiplier).toEqual(
        42
      )
      expect(customConfig).not.toEqual(defaultConfig)

      const customMerge = {
        ...defaultConfig,
        simulation: {
          ...defaultConfig.simulation,
          forces: {
            ...defaultConfig.simulation.forces,
            collision: {
              ...defaultConfig.simulation.forces.collision,
              radiusMultiplier: 42,
            },
          },
        },
      }
      expect(customMerge.simulation.forces).toStrictEqual(
        customConfig.simulation.forces
      )
    })
  })
})
