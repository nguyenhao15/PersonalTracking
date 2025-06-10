package com.haro._5.controllers;

import com.haro._5.dtos.Dashboard.DashboardSummary;
import com.haro._5.repositories.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dashboard")
@Controller
public class DashBoardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping
    public DashboardSummary getDashboard(
            @AuthenticationPrincipal UserDetails user
    ) {
        return dashboardService.getSummaryForUser(user.getUsername());
    }
}
