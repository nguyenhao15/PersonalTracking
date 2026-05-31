package com.example.demo.domains.ExpensesTracker.wallet.services;

import com.example.demo.domains.ExpensesTracker.wallet.dto.wallet.WalletInfoDto;
import com.example.demo.domains.ExpensesTracker.wallet.dto.wallet.WalletRequestDto;
import com.example.demo.domains.ExpensesTracker.wallet.dto.wallet.WalletSummaryInfo;
import com.example.demo.domains.ExpensesTracker.wallet.entity.WalletEntity;

import java.util.List;

public interface WalletService {

    WalletInfoDto createWallet(WalletRequestDto walletRequestDto);

    WalletEntity getWalletById(Long id);

    WalletInfoDto getWalletInfo(Long id);

    List<WalletSummaryInfo> getMyAllWallets();

    WalletInfoDto updateWalletBalance(Long id, Long amount);

    WalletInfoDto updateWallet(Long id, WalletRequestDto walletRequestDto);
}
