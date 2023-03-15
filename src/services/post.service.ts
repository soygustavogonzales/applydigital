export const Post = {
    
    getAll : async (query : string = "") => {
        try {

            const res = await fetch('http://hn.algolia.com/api/v1/search_by_date?'+query,
                {
                    method: 'GET'
                });
    
            const data = await res.json()
            return data.hits.map((e: { author: string, story_url: string, created_at: string}) => {
               return {
                author: e.author,
                url: e.story_url,
                created: e.created_at
               }
            })

        }catch(err) {
            console.error(err)
        }
    },

    getOne : () => {

    }
}
