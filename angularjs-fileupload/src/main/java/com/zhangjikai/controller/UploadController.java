package com.zhangjikai.controller;

import org.codehaus.plexus.personality.plexus.lifecycle.phase.Suspendable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.util.List;

/**
 * Created by ZhangJikai on 2016/10/21.
 */

@RestController
public class UploadController {

    private static final Logger logger = LoggerFactory
            .getLogger(UploadController.class);
    @RequestMapping(value = "/getData", method = RequestMethod.GET, produces = "application/json;charset=utf8")
    @ResponseBody
    public String getData() {
        return "success";
    }

    @RequestMapping(value = "/uploadSingleFile", method = RequestMethod.POST, produces = "text/html;charset=UTF-8")
    public @ResponseBody String uploadFileHandler(@RequestParam("file") MultipartFile file) {

        if (!file.isEmpty()) {
            try {
                byte[] bytes = file.getBytes();

                // Creating the directory to store file
                String rootPath = System.getProperty("catalina.home");
                //System.getProperties().list(System.out);
                File dir = new File(rootPath + File.separator + "tmpFiles");
                //System.out.println(dir);
                if (!dir.exists())
                    dir.mkdirs();

                // Create the file on server
                File serverFile = new File(dir.getAbsolutePath()
                        + File.separator + file.getOriginalFilename());
                BufferedOutputStream stream = new BufferedOutputStream(
                        new FileOutputStream(serverFile));
                stream.write(bytes);
                stream.close();

                logger.info("Server File Location="
                        + serverFile.getAbsolutePath());

                return "You successfully uploaded file=" + file.getOriginalFilename();
            } catch (Exception e) {
                return "You failed to upload " + file.getOriginalFilename() + " => " + e.getMessage();
            }
        } else {
            return "You failed to upload " + file.getOriginalFilename()
                    + " because the file was empty.";
        }
    }


    @RequestMapping(value = "/uploadMultipleFile", method = RequestMethod.POST, produces = "text/html;charset=UTF-8")
    public @ResponseBody
    String uploadMultipleFileHandler(@RequestParam("file") List<MultipartFile> files) {

        System.out.println(files.size());
        String message = "";
        for (int i = 0; i < files.size(); i++) {
            MultipartFile file = files.get(i);

            try {
                byte[] bytes = file.getBytes();

                // Creating the directory to store file
                String rootPath = System.getProperty("catalina.home");
                File dir = new File(rootPath + File.separator + "tmpFiles");
                if (!dir.exists())
                    dir.mkdirs();

                // Create the file on server
                File serverFile = new File(dir.getAbsolutePath()
                        + File.separator + file.getOriginalFilename());
                BufferedOutputStream stream = new BufferedOutputStream(
                        new FileOutputStream(serverFile));
                stream.write(bytes);
                stream.close();

                logger.info("Server File Location="
                        + serverFile.getAbsolutePath());

                message = message + "You successfully uploaded file=" + file.getOriginalFilename()
                        + "<br />";
            } catch (Exception e) {
                return "You failed to upload " + file.getOriginalFilename() + " => " + e.getMessage();
            }
        }
        return message;
    }


}
