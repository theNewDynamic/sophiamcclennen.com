import React from "react"

class BookPreview extends React.Component {
  render() {
    const entry = this.props.entry;
    let cover = entry.getIn(["data", "editions", 0, "cover_image"])
    return (
      <div className="container max-w-5xl py-8">
        <div class="flex flex-wrap">
          <div class="w-full pr-4 md:w-1/3">
            <div class="mb-4">
              {cover && 
                <div class="shadow-2xl">
                  <img className="shadow-md" src={cover} alt="" />
                </div>
              }
            </div>
          </div>
          <div class="w-full md:w-2/3 md:pl-4">
            <div class="mb-6 text-3xl font-bold text-gray-800 md:text-4xl">
            {this.props.widgetFor('title')}
            </div>
            <div className="prose prose-lg">
              {this.props.widgetFor('body')}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
module.exports = BookPreview
