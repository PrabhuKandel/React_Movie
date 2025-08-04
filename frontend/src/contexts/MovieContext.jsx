import {createContext, useState, useContext, useEffect} from "react"

const MovieContext = createContext()

export const useMovieContext = ()=>useContext(MovieContext)

export const MovieProvider = ({children})=>{


    
    const [favourites, setFavourites]=useState(()=>{
        const storedFavs = localStorage.getItem("favourites");
        return storedFavs?JSON.parse(storedFavs):[];

    })

    //while refreshing local storage item is removed so write in use state instead
    // useEffect(()=>{
    //     const storedFavs = localStorage.getItem("favourites")
    //      console.log("🟡 Get item:", storedFavs);
    //     if(storedFavs) setFavourites(JSON.parse(storedFavs))
    //     console.log("Get item after parsed:" , JSON.parse(storedFavs));

    // },[])
    

    useEffect(()=>{
     
            localStorage.setItem('favourites',JSON.stringify(favourites))

    },[favourites])


          

    const addToFavourites = (movie)=>{

        setFavourites(prev=>[...prev,movie])
    }

    const removeFromFavourites = (movieId)=>{
        setFavourites(prev=>prev.filter(movie=>movie.id!==movieId))

    }

    
    const isFavourite = (movieId)=>{

        return favourites.some(movie=>movie.id===movieId)
    }

    const value={
        favourites,
        addToFavourites,
        removeFromFavourites,
        isFavourite
    }
    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}