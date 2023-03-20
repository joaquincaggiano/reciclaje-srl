import {useEffect, useState} from 'react'

// export default function useUnsavedChanges(value: any, arr1, arr2){
//     const [unsavedChanges, setUnsavedChanges] = useState(value)

// function compareArrays(arr1: string[], arr2: string[]) {
//     if (arr1.length === arr2.length) {
//       return arr1.every(function (element, index) {
//         if (element === arr2[index]) {
//           setUnsavedChanges(false);
//         } else {
//           setUnsavedChanges(true);
//         }
//       });
//     } else {
//       return setUnsavedChanges(true);
//     }
//   }
//     return [unsavedChanges, compareArrays(arr1, arr2)]
// }
export default function useUnsavedChanges<T>(): [boolean, React.Dispatch<React.SetStateAction<boolean>>, (arr1: any[], arr2: any[]) => void]{
    const [unsavedChanges, setUnsavedChanges] = useState(false)
const compareArrays = function(arr1: any[], arr2: any[]){
    if (arr1.length === arr2.length) {
               arr1.every(function (element: any, index: string | number) {
                //@ts-ignore
                if (element === arr2[index]) {
                  setUnsavedChanges(false);
                } else {
                  setUnsavedChanges(true);
                }
              });
            } else {
               setUnsavedChanges(true);
            }
}
    return [unsavedChanges, setUnsavedChanges, compareArrays]
}