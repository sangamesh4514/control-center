const initialState = {
    login: {
        phone_number: '',
        request_id: '',
        success: false,
    },
    verify: {
        userId: '',
        accessToken: '',
        wrongOtp: true
    },
    behaviour: {
        behaviour_id: '',
        name: '',
        description: '',
        image_url: '',
        steps: [],
        start_from: '',
        repeat_sequence: '',
        robot_id: ''
    }

}

export default initialState;