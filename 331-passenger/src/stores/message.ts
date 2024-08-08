import type { MessageState } from "@/types";
import { defineStore } from "pinia";
export const useMessageStore = defineStore('message', {
    state: (): MessageState => ({
        message: ''
    }),
    actions: {
        updateMessage(message: String): void {
            this.message = message
        },
        resetMessage(): void {
            this.message = ''
        }
    }
})