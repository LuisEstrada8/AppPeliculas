
import ImageColors from 'react-native-image-colors';

export const getImageColors = async( uri:string ) => {

    const colors = await ImageColors.getColors(uri, {})   

    let primary;
    let middle;
    let seconday;

    if (colors.platform === "android") {
        primary = colors.dominant;
        middle = colors.average;


      } else {
        let primary = colors.primary;
        let secondary = colors.secondary
      }

      return[primary, middle,seconday]

}
