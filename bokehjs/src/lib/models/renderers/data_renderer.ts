import {Renderer, RendererView} from "./renderer"
import {SelectionManager} from "core/selection_manager"
import * as p from "core/properties"

export abstract class DataRendererView extends RendererView {
  model: DataRenderer
  visuals: DataRenderer.Visuals
}

export namespace DataRenderer {
  export type Attrs = p.AttrsOf<Props>

  export type Props = Renderer.Props & {
    x_range_name: p.Property<string>
    y_range_name: p.Property<string>
  }

  export type Visuals = Renderer.Visuals
}

export interface DataRenderer extends DataRenderer.Attrs {}

export abstract class DataRenderer extends Renderer {
  properties: DataRenderer.Props

  constructor(attrs?: Partial<DataRenderer.Attrs>) {
    super(attrs)
  }

  static initClass(): void {
    this.prototype.type = "DataRenderer"

    this.define<DataRenderer.Props>({
      x_range_name: [ p.String, 'default' ],
      y_range_name: [ p.String, 'default' ],
    })

    this.override({
      level: 'glyph',
    })
  }

  abstract get_selection_manager(): SelectionManager
}
DataRenderer.initClass()
