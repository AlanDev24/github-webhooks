import express from 'express';
import { envs } from './config';
import { githubController } from './presentation/github/controller';


(()=>{
    main();
})();


function main(){

    const app = express();
    app.use(express.json());
    const controller = new githubController();

    app.post('/api/github', controller.webHookHandler);

    app.listen( envs.PORT, () =>{
        console.log(`App runing on port ${ envs.PORT }`);
    } );
}