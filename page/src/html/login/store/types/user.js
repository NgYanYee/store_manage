import namespace from '@/utils/namespace'

export default namespace('user', {
    actions: [
		'Login',
		'Register'
    ],
    mutations: [
        'setInfo',
    ]
})