const api = {
    //登录   username：Emicnet  password：9153FD2BDEA340A8B7D4254E26935597
    loginIn: "/Index/Index/login",  

    //登出
    logout: "/Index/Index/logout",  

    //判断登录
    isLogin: "/Index/Index/isLogin",  

    //企业列表
    getCompanyList: "/Index/Index/enterprises",  

    //任务列表 ep_id
    getTaskList: "/Index/Index/tasks",  

    //日志列表 ep_id
    getlogList: "/Index/Index/logs",  

    //任务详情 ep_id、task_id
    taskDetail: "/Index/Index/task",  

    // 任务话单
    taskRecord: "/Index/Index/taskRecord", 
    
    // 企业配置 ep_id
    epProfiles: "/Index/Index/epProfiles"
    

}

export default api;
