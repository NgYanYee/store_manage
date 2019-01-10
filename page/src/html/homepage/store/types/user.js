import namespace from '@/utils/namespace'

export default namespace('user', {
    actions: [
		'getMyInfo',
        'inStore',
        'exit',
        'outStore',
        'getItemList',
        'getInList',
        'getOutList'
    ],
    mutations: [
        'setInfo',
    ]
})