import { useRecoilValue } from "recoil";
import { balanceAtom } from "../atoms/balance.js";

export const useBalance = () => {
    // console.log('useBalance running on:', typeof window !== 'undefined' ? 'Client' : 'Server');
    const balance = useRecoilValue(balanceAtom);
    return balance;
}