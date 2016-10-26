import com.zhangjikai.encrypt.Encryption;
import org.junit.Test;

/**
 * Created by ZhangJikai on 2016/10/26.
 */
public class TestEncryption {

    @Test
    public void testBase64() {
        String s = "\n" +
                "\n" +
                "                                                Sulfate-(O-6)+\n" +
                "                                                             |\n" +
                " Sulfate-(O-6)-a-D-Glcp2Me3Me4Me-(1-4)-b-D-GlcpA2Me3Me-(1-4)+|                  Sulfate-(O-6)+\n" +
                "                                                            ||                               |\n" +
                "                                                        a-D-Glcp-(1-4)-a-L-IdopA2Me3Me-(1-4)+|\n" +
                "                                                            ||                              ||\n" +
                "                                               Sulfate-(O-3)+|                          a-D-Glcp-(1-1)-methyl\n" +
                "                                                             |                              ||\n" +
                "                                                Sulfate-(O-2)+                 Sulfate-(O-3)+|\n" +
                "                                                                                             |\n" +
                "                                                                                Sulfate-(O-2)+\n";

        String encodeStr = Encryption.base64Encode(s);
        System.out.println(encodeStr);
        System.out.print(Encryption.base64Decode(encodeStr));

    }
}
