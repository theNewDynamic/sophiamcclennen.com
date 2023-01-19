export const deskStructureEditors = (S) =>

  S.list().title('Content')
    .items([

      S.listItem()
        .title('What I\'m Watching')
        .child(
          S.documentTypeList('post')
            .defaultOrdering([
              { field: 'publishedAt', direction: 'desc' }
            ])
        ),

      S.listItem().title('News')
        .child(
          S.documentTypeList('news')
            .defaultOrdering([
              { field: 'publishedAt', direction: 'desc' }
            ])
        ),
      
        S.divider(),

      S.listItem()
        .title('Books')
        .child(
          S.documentTypeList('book')
            .defaultOrdering([
              { field: 'publishedAt', direction: 'desc' }
            ])
        ),

      S.listItem()
        .title('Reviews')
        .child(
          S.list()
          .title('Filters')
          .items([            

            S.listItem()
              .title('Reviews by Book')
              .child(
                S.documentTypeList('book')
                  .title('Reviews by Book')
                  .child((relatedBook) =>
                    S.documentList()
                      .title('Reviews')
                      // INclud to filter only books that have reviews
                      .filter('_type == "review" && $relatedBook == related_book._ref')
                      .params({ relatedBook })
                  )
              ),

              S.listItem()
                .title('Reviews')
                .child(
                  S.documentTypeList('review')
                    .defaultOrdering([
                      { field: 'publishedAt', direction: 'desc' }
                    ])
                ),

          ])),


        S.divider(),

        //CORE
      ...S.documentTypeListItems().filter(listItem => !['media.tag','post', 'news', 'book', 'review', 'siteSettings'].includes(listItem.getId())),
      
      S.listItem()
        .title('Site Settings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')),

    ])