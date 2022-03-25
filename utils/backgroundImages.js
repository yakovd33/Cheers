
import { getBackgroundImage } from "./FirebaseUtils";
import { themes } from "../Components/Screens/EventScreen/InvitationScreen/ThemeCards";

const keys = ["flowers", "whitewood","blackMarble", "brickWall", "marble", "black", "hearts", "cloud", "greyMarble", "goldHearts", "stars", "whiteFlowers", "goldFlowers", "pinkMarble", "gold", "greenFlowers", "goldDots", "wood", "goldPinkMarble", "pink", "torquise", "cream", "color-space", "grey-wall", "grey-yellow-green", "painting-bg", "red-splash", "colored-ilusion", "merable-red", "blue-splashed"]
const getImages = async () => {
    
    let backgrounds = {}
    let promises = [];
    keys.forEach((key)=>{
        promises.push(getBackgroundImage(key).then(res=>{
            backgrounds[key] = res;
        }).catch(e=>{console.log('couldnt get background :',e)}));
    });
    return Promise.all(promises).then(()=>{
        return backgrounds;
    })
    
}
export default getImages;

