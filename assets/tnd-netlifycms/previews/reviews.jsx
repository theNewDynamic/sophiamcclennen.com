import React from "react"

class ReviewPreview extends React.Component {
  render() {
    const entry = this.props.entry;
    const body = entry.getIn(["data", "body"])
    const attribution = entry.getIn(["data", "attribution"])
    return (
      <div className="px-4 pt-8 pb-8 mx-auto text-2xl leading-normal text-center">
        {body &&
          <blockquote class="add-quote-marks font-brand mb-1">
          {this.props.widgetFor('body')}
          </blockquote>
        }
        {attribution &&
          <span class="text-sm">— {this.props.widgetFor('attribution')}</span>
        }
      </div>
    )
  }
}
module.exports = ReviewPreview
