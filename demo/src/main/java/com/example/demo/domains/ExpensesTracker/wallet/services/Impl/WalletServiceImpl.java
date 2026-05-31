package com.example.demo.domains.ExpensesTracker.wallet.services.Impl;

import com.example.demo.core.Exceptions.ResourceNotFoundException;
import com.example.demo.core.Security.utils.SecurityUtil;
import com.example.demo.domains.ExpensesTracker.wallet.dto.wallet.WalletInfoDto;
import com.example.demo.domains.ExpensesTracker.wallet.dto.wallet.WalletRequestDto;
import com.example.demo.domains.ExpensesTracker.wallet.dto.wallet.WalletSummaryInfo;
import com.example.demo.domains.ExpensesTracker.wallet.entity.WalletEntity;
import com.example.demo.domains.ExpensesTracker.wallet.mapper.WalletMapper;
import com.example.demo.domains.ExpensesTracker.wallet.services.WalletService;
import com.example.demo.repositories.postgreSQL.module.ExpenseTracker.WalletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WalletServiceImpl implements WalletService {

    @Autowired
    private WalletRepository walletRepository;

    @Autowired
    private WalletMapper walletMapper;

    @Autowired
    private SecurityUtil securityUtil;

    @Override
    public WalletInfoDto createWallet(WalletRequestDto walletRequestDto) {
        Long userId = securityUtil.getCurrentUserDetails().getId();

        WalletEntity wallet = walletMapper.fromRequestToEntity(walletRequestDto);
        wallet.setOwnerId(userId);
        WalletEntity savedWallet = walletRepository.save(wallet);
        return walletMapper.fromEntityToDto(savedWallet);
    }

    @Override
    public WalletEntity getWalletById(Long id) {
        return walletRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Wallet","id",  id));
    }

    @Override
    public WalletInfoDto getWalletInfo(Long id) {
        WalletEntity wallet = getWalletById(id);
        return walletMapper.fromEntityToDto(wallet);
    }

    @Override
    public List<WalletSummaryInfo> getMyAllWallets() {
        Long userId =securityUtil.getCurrentUserDetails().getId();
        Sort sort = Sort.by(Sort.Direction.DESC, "priority");
        List<WalletEntity> walletEntities = walletRepository.findByOwnerId(userId, sort);
        return walletMapper.fromEntityToSummaryInfoList(walletEntities);
    }

    @Override
    public WalletInfoDto updateWalletBalance(Long id, Long amount) {
        WalletEntity wallet = getWalletById(id);
        Long currentBalance = wallet.getBalance();
        Long newBalance = currentBalance + amount;
        wallet.setBalance(newBalance);
        WalletEntity updatedWallet = walletRepository.save(wallet);
        return walletMapper.fromEntityToDto(updatedWallet);
    }

    @Override
    public WalletInfoDto updateWallet(Long id, WalletRequestDto walletRequestDto) {
        WalletEntity wallet = getWalletById(id);
        walletMapper.updateEntityFromRequest(walletRequestDto, wallet);
        WalletEntity savedWallet = walletRepository.save(wallet);
        return walletMapper.fromEntityToDto(savedWallet);
    }
}
