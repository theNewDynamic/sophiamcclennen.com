import React from "react"

class PostPreview extends React.Component {
  render() {
    const {entry, fieldsMetaData} = this.props;
    const authors = fieldsMetaData.getIn(['authors', 'persons']);
    const image = entry.getIn(["data", "image"])
    return (
      <div className="container max-w-4xl font-sans lg:py-12">
        <h1 className="text-3xl font-bold lg:text-5xl">{ entry.getIn(['data', 'title']) }</h1>
        {image &&
          <div className="max-full my-4">
            <img class="block" src={image} alt="" />
          </div>
        }
        {authors &&
        <div>
          <div className="font-bold">Authors:</div>
          <ul>
            {authors.valueSeq().map( (author, index) => (
              <li key={index}>{author.get('title')} | @{author.get('twitter_handle')}</li>
            ))}
          </ul>
        </div>
        }
        <div className="my-12 prose prose-lg">
          {this.props.widgetFor('body')}
        </div>
      </div>
    )
  }
}
module.exports = PostPreview
