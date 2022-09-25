import { Pinia } from 'pinia';
import useAuthStore from '@/store/modules/authStore';
import useLayoutStore from '@/store/modules/layoutStore';

export default function useStore(pinia?: Pinia) {
    return {
        auth: useAuthStore(),
        layout: useLayoutStore()
    };
}
