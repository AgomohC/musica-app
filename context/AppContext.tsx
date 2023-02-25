import { useContext, useReducer, createContext, Dispatch } from "react"
import { AppReducer } from "./AppReducer"
import { initialAppState, ActionPayload, ActionCreator, Playlist } from "./context-types"
import { useEffect } from "react"
import { ACTIONS } from "./actions"

const initialState: initialAppState = {
	isSideBarOpen: false,
	likes: [
		{
			id: "1",
			title: "Femto Playlist",
			cover: "https://e-cdns-images.dzcdn.net/images/cover/d4761825eca7fb9810da3b4af0efe7eb/500x500-000000-80-0-0.jpg",
			info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo non dolore neque doloremque, repudiandae sunt, vero excepturi possimus deserunt aliquid dignissimos, ex fuga aperiam tempora saepe. Soluta voluptas assumenda reprehenderit!",
			files: [
				{
					id: "727738",
					artist: "America",
					title: "Don't Cross the River",
					audio: "https://cdns-preview-d.dzcdn.net/stream/c-d94c0dcdb37faf69bf7faad789f14f76-8.mp3",
					cover: "https://e-cdns-images.dzcdn.net/images/cover/90758014c42242478ba9a7a6e33dcff5/500x500-000000-80-0-0.jpg",
					duration: "2:29",
				},
				{
					id: "13529563",
					artist: "Rihanna",
					title: "Only Girl (In The World)",
					audio: "https://cdns-preview-d.dzcdn.net/stream/c-d20ea30267f84d42b66c6aa61c3aa43c-10.mp3",
					cover: "https://e-cdns-images.dzcdn.net/images/cover/3a12c64bb52a167944783878ffe41f02/500x500-000000-80-0-0.jpg",
					duration: "3:55",
				},
				{
					id: "14525573",
					artist: "Rihanna",
					title: "Where Have You Been",
					audio: "https://cdns-preview-7.dzcdn.net/stream/c-70eb82ab241f9ed6f5a22ed1fa958ad3-9.mp3",
					cover: "https://e-cdns-images.dzcdn.net/images/cover/5199f89d5113a83b5086463d5d0c9415/500x500-000000-80-0-0.jpg",
					duration: "4:02",
				},
				{
					id: "2485118",
					artist: "Beyonc\u00e9",
					title: "Single Ladies (Put a Ring on It)",
					audio: "https://cdns-preview-b.dzcdn.net/stream/c-b844f52cb55a5d993a3daf4be4b0d069-5.mp3",
					cover: "https://e-cdns-images.dzcdn.net/images/cover/1f0450a010b5a825194d7ca00b3067ab/500x500-000000-80-0-0.jpg",
					duration: "3:13",
				},
				{
					id: 13139151,
					artist: "Beyonc\u00e9",
					title: "Beautiful Liar",
					audio: "https://cdns-preview-6.dzcdn.net/stream/c-6bc698380b2f1a46767ef90a995a073f-7.mp3",
					cover: "https://e-cdns-images.dzcdn.net/images/cover/d4761825eca7fb9810da3b4af0efe7eb/500x500-000000-80-0-0.jpg",
					duration: "3:21",
				},
				{
					id: 66190255,
					artist: "Beyonc\u00e9",
					title: "Love On Top",
					audio: "https://cdns-preview-4.dzcdn.net/stream/c-4e36067b451efc0153f588540407d7a4-4.mp3",
					cover: "https://e-cdns-images.dzcdn.net/images/cover/bc927a6b67e8a16351a3de87ba94328c/500x500-000000-80-0-0.jpg",
					duration: "4:25",
				},
			],
		},
		{
			id: "2",
			title: "Sakamoto Playlist",
			cover: "https://e-cdns-images.dzcdn.net/images/cover/fcf05300b7c17ec77a6d01028a4bef61/500x500-000000-80-0-0.jpg",
			info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo non dolore neque doloremque, repudiandae sunt, vero excepturi possimus deserunt aliquid dignissimos, ex fuga aperiam tempora saepe. Soluta voluptas assumenda reprehenderit!",
			files: [
				{
					id: 116348656,
					artist: "The Beatles",
					title: "Let It Be",
					audio: "https://cdns-preview-e.dzcdn.net/stream/c-e7e6e2142422aa4599294dee57197be9-13.mp3",
					cover: "https://e-cdns-images.dzcdn.net/images/cover/fcf05300b7c17ec77a6d01028a4bef61/500x500-000000-80-0-0.jpg",
					duration: "4:03",
				},
				{
					id: 116348464,
					artist: "The Beatles",
					title: "Here Comes The Sun",
					audio: "https://cdns-preview-5.dzcdn.net/stream/c-5503df16eade59c9031bab1d4152c09f-11.mp3",
					cover: "https://e-cdns-images.dzcdn.net/images/cover/aa94ab293730bb7845d2aa8c672b2c29/500x500-000000-80-0-0.jpg",
					duration: "3:05",
				},
				{
					id: 116348128,
					artist: "The Beatles",
					title: "Come Together",
					audio: "https://cdns-preview-4.dzcdn.net/stream/c-4c92fc2bfba2157de13ed654ea354020-9.mp3",
					cover: "https://e-cdns-images.dzcdn.net/images/cover/32b6b5174e633cd6d182d00024dddcb5/500x500-000000-80-0-0.jpg",
					duration: "4:19",
				},
				{
					id: 727720,
					artist: "America",
					title: "A Horse with No Name",
					audio: "https://cdns-preview-6.dzcdn.net/stream/c-6de7749102160a36f8ab4b6c4f55d455-10.mp3",
					cover: "https://e-cdns-images.dzcdn.net/images/cover/90758014c42242478ba9a7a6e33dcff5/500x500-000000-80-0-0.jpg",
					duration: "4:12",
				},
				{
					id: 732851,
					artist: "America",
					title: "Lonely People",
					audio: "https://cdns-preview-d.dzcdn.net/stream/c-d9819b7fee739acd82a06641815c90ac-10.mp3",
					cover: "https://e-cdns-images.dzcdn.net/images/cover/7f8c81e6882f107c6fce6bbb9079d781/500x500-000000-80-0-0.jpg",
					duration: "2:30",
				},
				{
					id: 1988270837,
					artist: "Rihanna",
					title: "Lift Me Up",
					audio: "https://cdns-preview-0.dzcdn.net/stream/c-0c43e5237f9b36b0dad5f96e894af372-4.mp3",
					cover: "https://e-cdns-images.dzcdn.net/images/cover/99a8eb360d6b04b1f9b8c205c22ae88d/500x500-000000-80-0-0.jpg",
					duration: "3:16",
				},
			],
		},
	],
}
export const AppContext = createContext<{
	state: initialAppState
	dispatch: Dispatch<ActionCreator<ActionPayload>[keyof ActionCreator<ActionPayload>]>
}>({
	state: initialState,
	dispatch: () => null,
})

export const AppProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
	const [state, dispatch] = useReducer(AppReducer, initialState)
	useEffect(() => {
		let result = localStorage.getItem("likes")
		if (result) {
			dispatch({ type: ACTIONS.set_likes_state, payload: JSON.parse(result) })
		} else {
			dispatch({ type: ACTIONS.set_likes_state, payload: [] })
		}
	}, [])
	return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export const useLocalContext = () => useContext(AppContext)
