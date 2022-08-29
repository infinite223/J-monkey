export const gameModes = [
    {
        level:'Easy',
        color:'lightgreen',
        select:true, points:0, 
        strokeRange: -5, 
        obstacle: {min: 20, max: 40},
        background:require('../assets/background.jpg')
    },
    {
        level:'Medium', 
        color:'blue', 
        select:false, 
        points:0,  
        strokeRange: -6, 
        obstacle: {min: 0, max: 30},
        background:'background.jpg'
    },
    {
        level:'Hard',
        color:'red', 
        select:false, 
        oints:0,  
        strokeRange: -6, 
        obstacle: {min: -30, max: 10},
        background:'background.jpg'
    }
]