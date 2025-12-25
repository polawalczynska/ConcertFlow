package com.concertflow.api.concert.builder;

import com.concertflow.api.artist.entity.Artist;
import com.concertflow.api.concert.dto.ConcertRequest;
import com.concertflow.api.concert.entity.Concert;
import com.concertflow.api.user.entity.User;
import org.springframework.stereotype.Component;

@Component
public class ConcertBuilder {
    public Concert build(ConcertRequest request, Artist artist, User coordinator, User budgetManager) {
        return Concert.builder()
            .name(request.name())
            .date(request.date())
            .venue(request.venue())
            .city(request.city())
            .budget(request.budget())
            .description(request.description())
            .artist(artist)
            .coordinator(coordinator)
            .budgetManager(budgetManager)
            .build();
    }

    public void updateFields(Concert concert, ConcertRequest request, Artist artist, User budgetManager) {
        concert.setName(request.name());
        concert.setDate(request.date());
        concert.setVenue(request.venue());
        concert.setCity(request.city());
        concert.setBudget(request.budget());
        concert.setDescription(request.description());
        concert.setArtist(artist);
        concert.setBudgetManager(budgetManager);
    }
}

