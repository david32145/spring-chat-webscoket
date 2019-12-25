package com.websocket.controllers.http;

import com.websocket.requests.NewMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/message")
public class MessageController {

    @Autowired
    private SimpMessagingTemplate template;

    @PostMapping
    public NewMessage create(@RequestBody NewMessage data){
        template.convertAndSend("/topic/newMessage", data);
        return data;
    }
}
