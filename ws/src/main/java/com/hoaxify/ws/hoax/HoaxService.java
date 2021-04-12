package com.hoaxify.ws.hoax;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.hoaxify.ws.user.User;
import com.hoaxify.ws.user.UserService;

@Service
public class HoaxService {

	HoaxRepository hoaxRepository;

	UserService userService;

	public HoaxService(HoaxRepository hoaxRepository, UserService userService) {
		super();
		this.hoaxRepository = hoaxRepository;
		this.userService = userService;
	}

	public void save(Hoax hoax, User user) {
		hoax.setTimestamp(new Date());
		hoax.setUser(user);
		hoaxRepository.save(hoax);
	}

	public Page<Hoax> getHoaxes(Pageable page) {
		return hoaxRepository.findAll(page);
	}

	public Page<Hoax> getHoaxesOfUser(String username, Pageable page) {
		User inDB = userService.getByUsername(username);
		return hoaxRepository.findByUser(inDB, page);
	}

	public Page<Hoax> getOldHoaxes(Long id, String username, Pageable page) {
		Specification<Hoax> specification = idLessThan(id);
		if (username != null) {
			User inDB = userService.getByUsername(username);
			specification = specification.and(userIs(inDB));
		}
		return hoaxRepository.findAll(specification, page);
	}

	public long getNewHoaxesCount(Long id, String username) {

		Specification<Hoax> specification = idGreaterThan(id);
		if (username != null) {
			User inDB = userService.getByUsername(username);
			specification = specification.and(userIs(inDB));
		}
		return hoaxRepository.count(specification);
	}

	public List<Hoax> getNewHoaxes(Long id, String username, Sort sort) {
		Specification<Hoax> specification = idGreaterThan(id);
		if (username != null) {
			User inDB = userService.getByUsername(username);
			specification = specification.and(userIs(inDB));
		}
		return hoaxRepository.findAll(specification, sort);
	}

	Specification<Hoax> idLessThan(long id) {
		return (root, query, criteriaBuilder) -> {
			return criteriaBuilder.lessThan(root.get("id"), id);
		};
	}

	Specification<Hoax> userIs(User user) {
		return (root, query, criteriaBuilder) -> {
			return criteriaBuilder.equal(root.get("user"), user);
		};
	}

	Specification<Hoax> idGreaterThan(long id) {
		return (root, query, criteriaBuilder) -> {
			return criteriaBuilder.greaterThan(root.get("id"), id);
		};
	}

}
