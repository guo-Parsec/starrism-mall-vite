import useAuthStore from '@/store/modules/authStore';

export default function useStore() {
    return {
        auth: useAuthStore()
    }
}