import { iPost } from "../dto/post.interface";

export const Post = {
    
    getAll : async (query : string = "") => {
        try {

            const res = await fetch('http://hn.algolia.com/api/v1/search_by_date?'+query,
                {
                    method: 'GET'
                });
    
            const data = await res.json()
            const posts =  data.hits.map((e: { author: string, story_url: string, created_at: string, story_id: number}) => {
               return {
                author: e.author,
                url: e.story_url,
                created: e.created_at,
                id: e.story_id
               }
            })
            posts.forEach((e:iPost,i:number) => {
                if(e.author == null || e.created == null || e.id == null || e.url == null) {
                    posts.splice(i,1);
                }
            });
            return {posts: posts, totalPages:data.nbPages};

        }catch(err) {
            console.error(err)
        }
    },

    getOne : () => {

    }
}
