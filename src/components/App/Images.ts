/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useReducer } from "react";
import { getPhotos, SearchResult } from "../../pixabayAPI";

export type Image = {
  id: number;
  tags: string;
  webformatURL: string;
  largeImageURL: string;
};
type State = {
  loadingState: "loading" | "done" | "more",
  query: string,
  images: Image[],
  page: number,
};
type Action = ['query', query: string] | ["set", photos: SearchResult] | ['nextPage']

export class Images {
  state: State = {
    loadingState: "done",
    query: '',
    images: [],
    page: 1,
  }

  dispatch: React.Dispatch<Action> = () => { }
  setQuery = async (query: string) => {
    this.dispatch(['query', query])
    if (query !== '')
      this.dispatch(['set', await getPhotos(query)])
  }
  nextPage = async () => {
    const page = this.state.page + 1;
    this.dispatch(['nextPage'])
    this.dispatch(['set', await getPhotos(this.state.query, page)])
  }
  // reducer: React.Reducer<State, Action>
  reducer(state: State, action: Action): State {
    switch (action[0]) {
      case 'query': {
        const query = action[1];
        const s1 = { query, page: 1 };
        if (query !== '')
          return { ...state, ...s1, loadingState: "loading" };
        return { ...state, ...s1, images: [], loadingState: "done" };
      }
      case 'nextPage':
        return { ...state, page: state.page + 1, loadingState: "loading" };
      case 'set': {
        const { hits, total } = action[1];
        const { page, images } = state;
        return {
          ...state,
          images: page === 1 ? hits : [...images, ...hits],
          loadingState: hits.length === 0 || total <= 12 * page ? "done" : "more"
        }
      }
      default:
        return state;
    }
  }

  useStore(): State {
    const [state, dispatch] = useReducer(this.reducer, this.state);
    useEffect(() => {
      this.dispatch = dispatch;
    }, [dispatch])
    this.state = state;
    return state;
  }
}