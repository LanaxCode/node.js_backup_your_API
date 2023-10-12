import fs from 'node:fs/promises';
import { stringify } from 'node:querystring';

// export const backup = async () => {
//     try {
//         const response = await fetch('https://jsonplaceholder.typicode.com/posts');
//         const json = await response.json()
//         console.log(json)
//         // await
//         fs.appendFile('./data/posts.json', `${json.map((element) => {
//             return JSON.stringify({
//                 userId: element.userId,
//                 id: element.id,
//                 title: element.title,
//                 body: element.body
//             }, null, 2)
//         })}`)
//         return json
//     } catch (error) {
//         console.error("wrong")
//     }
// }
// backup().then((resp) => console.log(resp))

const backup = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const json = await response.json();
        // console.log({ json })

        const comments = [];

        for (const post of json) {
            const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`);
            const postComments = await commentsResponse.json();


            comments.push(...postComments);
            console.log(...postComments)
        }

        fs.writeFile("./data/comments.json", JSON.stringify(comments, null, 2))
        fs.writeFile("./data/posts.json", JSON.stringify(json, null, 2))

        console.log("erfolgreich abgeschlossen.");
    } catch (error) {
        console.log("something is wrong", error)
    }
}

backup().then((resp) => console.log({ resp }))
