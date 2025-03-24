import {create} from "zustand";

const memoStore = create((set) => ({
    memos: [
        {
            id: 1,
            title: "Memo 1",
            content: "This is the content of memo 1",
            state: "DONE",
            createdAt: "2021-01-02 00:00:00",
            updatedAt: "2021-01-02 20:00:00"
        },
        {
            id: 2,
            title: "Memo 2",
            content: "This is the content of memo 2",
            state: "TODO",
            createdAt: "2021-01-03 00:00:00",
            updatedAt: "2021-01-03 05:00:00"
        },
        {
            id: 3,
            title: "Memo 3",
            content: "This is the content of memo 3",
            state: "DONE",
            createdAt: "2021-01-04 00:00:00",
            updatedAt: "2021-01-04 07:00:00"
        },
        {
            id: 4,
            title: "Memo 4",
            content: "This is the content of memo 4",
            state: "TODO",
            createdAt: "2021-01-05 00:00:00",
            updatedAt: "2021-01-05 06:00:00"
        },
        {
            id: 5,
            title: "Memo 5",
            content: "This is the content of memo 5",
            state: "DONE",
            createdAt: "2021-01-06 00:00:00",
            updatedAt: "2021-01-06 16:00:00"
        },
        {
            id: 6,
            title: "Memo 6",
            content: "This is the content of memo 6",
            state: "TODO",
            createdAt: "2021-01-07 00:00:00",
            updatedAt: "2021-01-07 05:00:00"
        },
        {
            id: 7,
            title: "Memo 7",
            content: "This is the content of memo 7",
            state: "DONE",
            createdAt: "2021-01-08 00:00:00",
            updatedAt: "2021-01-08 01:00:00"
        },
        {
            id: 8,
            title: "Memo 8",
            content: "This is the content of memo 8",
            state: "TODO",
            createdAt: "2021-01-09 00:00:00",
            updatedAt: "2021-01-09 03:00:00"
        },
        {
            id: 9,
            title: "Memo 9",
            content: "This is the content of memo 9",
            state: "DONE",
            createdAt: "2021-01-10 00:00:00",
            updatedAt: "2021-01-10 10:00:00"
        },
        {
            id: 10,
            title: "Memo 10",
            content: "This is the content of memo 10",
            state: "TODO",
            createdAt: "2021-01-11 00:00:00",
            updatedAt: "2021-01-11 15:00:00"
        },
        {
            id: 11,
            title: "Memo 11",
            content: "This is the content of memo 11",
            state: "DONE",
            createdAt: "2021-01-12 00:00:00",
            updatedAt: "2021-01-12 01:00:00"
        },
        {
            id: 12,
            title: "Memo 12",
            content: "This is the content of memo 12",
            state: "TODO",
            createdAt: "2021-01-13 00:00:00",
            updatedAt: "2021-01-13 14:00:00"
        },
        {
            id: 13,
            title: "Memo 13",
            content: "This is the content of memo 13",
            state: "DONE",
            createdAt: "2021-01-14 00:00:00",
            updatedAt: "2021-01-14 17:00:00"
        },
        {
            id: 14,
            title: "Memo 14",
            content: "This is the content of memo 14",
            state: "TODO",
            createdAt: "2021-01-15 00:00:00",
            updatedAt: "2021-01-15 06:00:00"
        },
        {
            id: 15,
            title: "Memo 15",
            content: "This is the content of memo 15",
            state: "DONE",
            createdAt: "2021-01-16 00:00:00",
            updatedAt: "2021-01-16 20:00:00"
        },
        {
            id: 16,
            title: "Memo 16",
            content: "This is the content of memo 16",
            state: "TODO",
            createdAt: "2021-01-17 00:00:00",
            updatedAt: "2021-01-17 20:00:00"
        },
        {
            id: 17,
            title: "Memo 17",
            content: "This is the content of memo 17",
            state: "DONE",
            createdAt: "2021-01-18 00:00:00",
            updatedAt: "2021-01-19 00:00:00"
        },
        {
            id: 18,
            title: "Memo 18",
            content: "This is the content of memo 18",
            state: "TODO",
            createdAt: "2021-01-19 00:00:00",
            updatedAt: "2021-01-19 16:00:00"
        },
        {
            id: 19,
            title: "Memo 19",
            content: "This is the content of memo 19",
            state: "DONE",
            createdAt: "2021-01-20 00:00:00",
            updatedAt: "2021-01-20 07:00:00"
        },
        {
            id: 20,
            title: "Memo 20",
            content: "This is the content of memo 20",
            state: "TODO",
            createdAt: "2021-01-21 00:00:00",
            updatedAt: "2021-01-21 02:00:00"
        }
    ],

    addMemo: (memo) => set((state) => ({
        memos: [...state.memos, memo]
    })),
    deleteMemo: (id) => set((state) => ({
        memos: state.memos.filter((memo) => memo.id !== id)
    })),
    updateMemo: (id, newMemo) => set((state) => ({
        memos: state.memos.map((memo) =>
            memo.id === id
                ? {...memo, ...newMemo, updatedAt: new Date().toISOString()}
                : memo)
    }))
}));

export default memoStore;