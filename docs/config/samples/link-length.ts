import { GraphLink, GraphNode, defineGraphConfig } from 'd3-graph-controller'

type CustomLink = GraphLink & { length: number }

const config = defineGraphConfig<string, GraphNode, CustomLink>({
  getLinkLength: (link: CustomLink) => link.length,
})
