import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../../Store/store";

// Export a hook that can be reused to resolve types
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;