import React from 'react';

export function slice_files(photolist, unwantedFilesList){
    const only_photos_list = []
    for(var i = 0; i < photolist.length; i++){
        const ending = photolist[i].slice(photolist[i].lastIndexOf("."), photolist[i].length)
        if(unwantedFilesList.indexOf(ending) <= 0){
            only_photos_list.push(photolist[i])
        }
    }
    return only_photos_list
}

export function folders(statefunction, folders){
    return folders.map(function(single){
        return(
            <div id="folderbox">
            <div id="onefolder" onClick={() => statefunction(single)}>
            </div>
            <p id="foldername">{single}</p>
            </div>
        )
    })
}

export function settup_current_directory(last_directory_list, new_folder){
    console.log(last_directory_list, new_folder)
    var value = ""
    for(var i = 0; i <last_directory_list.length; i++){
        if(value != ""){
            value += "/" + last_directory_list[i]
        }else{
            value = last_directory_list[i]
        }
    }
    console.log(value)
    if(value != ""){
        return value + "/" + new_folder
    }else{
        return new_folder
    }
}
