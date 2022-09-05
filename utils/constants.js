export const gameModes = [
    {
        level:'Easy',
        color:'lightgreen',
        select:true, 
        points:0, 
        strokeRange: -5, 
        obstacleRange: {min: 20, max: 40},
        background:require('../assets/background.jpg'),
        obstacle: [require('../assets/Easy/treeEasy1.jpg'), require('../assets/Easy/treeEasy2.jpg'), require('../assets/Easy/treeEasy3.jpg')]
    },
    {
        level:'Medium', 
        color:'blue', 
        select:false, 
        points:0,  
        strokeRange: -6, 
        obstacleRange: {min: 0, max: 30},
        background:'background.jpg',
        obstacle: ['treeMedium1.jpg', 'treeMedium2.jpg', 'treeMedium3.jpg']
    },
    {
        level:'Hard',
        color:'red', 
        select:false, 
        oints:0,  
        strokeRange: -6, 
        obstacleRange: {min: -30, max: 10},
        background:'background.jpg',
        obstacle: ['treeHard1.jpg', 'treeHard2.jpg', 'treeHard3.jpg']
    }
]