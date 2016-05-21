import com.zhangjikai.bean.User;
import com.zhangjikai.service.UserService;
import org.junit.*;
import org.junit.Test;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * Created by Administrator on 2016/5/12.
 */

public class TestUser {

    private ApplicationContext applicationContext;

    @Before
    public void initSpringContext() {
        applicationContext = new ClassPathXmlApplicationContext("classpath:/applicationContext.xml");
    }

    @Test
    public void testBCrypt() {
        String hashed = BCrypt.hashpw("111%@11", BCrypt.gensalt());
        if(BCrypt.checkpw("111111","$2a$10$q9EEM6FTWBY11n26R/OZQOlK2GoWdRa2eQp88f4iIsAXdM45hiHtq")) {
            System.out.println(true);
        }
        System.out.println(hashed);
    }

    @Test
    public void testAddUser() {
        System.out.println(applicationContext);
        User user = new User();
        user.setUserName("zhangjikai5");
        user.setPassword(BCrypt.hashpw("111111", BCrypt.gensalt()));
        user.setEmail("aaa@qq.com");

        UserService userService = (UserService) applicationContext.getBean("userService");
        userService.addUser(user);
        //userService.register(user);
    }

    @Test
    public void checkUserExists() {
        User user = new User();
        //user.setUserName("zhangjikai22");
        user.setEmail("aaa@qq.com");
        UserService userService = (UserService) applicationContext.getBean("userService");
        //userService.exists(user);
    }
}
