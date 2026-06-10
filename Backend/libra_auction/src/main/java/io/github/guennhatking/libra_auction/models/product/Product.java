package io.github.guennhatking.libra_auction.models.product;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.List;

import io.github.guennhatking.libra_auction.enums.product.ProductStatus;
import io.github.guennhatking.libra_auction.models.auction.Auction;
import io.github.guennhatking.libra_auction.models.person.Customer;

@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne
    private Customer creator;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "product")
    private java.util.List<Auction> auctions;

    @ManyToOne
    private Category category;

    @OneToMany(mappedBy = "product")
    private List<ProductImage> images;

    @OneToMany(mappedBy = "product")
    private List<ProductAttribute> attributes;

    @OneToMany(mappedBy = "product")
    private List<AttributeCombination> attributeCombinations;

    public List<AttributeCombination> getAttributeCombinations() {
        return attributeCombinations;
    }

    public void setAttributeCombinations(List<AttributeCombination> attributeCombinations) {
        this.attributeCombinations = attributeCombinations;
    }

    private String name;
    private Integer quantity;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    private ProductStatus status = ProductStatus.AVAILABLE;

    private String rootProductId;
    private OffsetDateTime versionCreatedAt;
    private boolean latestVersion = true;
    private boolean deleted = false;
    private OffsetDateTime deletedAt;

    // CONSTRUCTOR
    public Product() {
    }

    public Product(String name, int quantity, String description, Category category) {
        this.name = name;
        this.quantity = quantity;
        this.description = description;
        this.category = category;
    }

    // GETTER
    public String getId() {
        return id;
    }

    public Customer getCreator() {
        return creator;
    }

    public java.util.List<Auction> getAuctions() {
        return auctions;
    }

    public Category getCategory() {
        return category;
    }

    public String getName() {
        return name;
    }

    public int getQuantity() {
        return quantity;
    }

    public String getDescription() {
        return description;
    }

    public List<ProductImage> getImages() {
        return images;
    }

    public List<ProductAttribute> getAttributes() {
        return attributes;
    }

    public ProductStatus getStatus() {
        return status;
    }

    public String getRootProductId() {
        return rootProductId;
    }

    public OffsetDateTime getVersionCreatedAt() {
        return versionCreatedAt;
    }

    public boolean isLatestVersion() {
        return latestVersion;
    }

    public boolean isDeleted() {
        return deleted;
    }

    public OffsetDateTime getDeletedAt() {
        return deletedAt;
    }

    // SETTER
    public void setId(String id) {
        this.id = id;
    }

    public void setCreator(Customer creator) {
        this.creator = creator;
    }

    public void setAuctions(java.util.List<Auction> auctions) {
        this.auctions = auctions;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setImages(List<ProductImage> images) {
        this.images = images;
    }

    public void setAttributes(List<ProductAttribute> attributes) {
        this.attributes = attributes;
    }

    public void setStatus(ProductStatus status) {
        this.status = status;
    }

    public void setRootProductId(String rootProductId) {
        this.rootProductId = rootProductId;
    }

    public void setVersionCreatedAt(OffsetDateTime versionCreatedAt) {
        this.versionCreatedAt = versionCreatedAt;
    }

    public void setLatestVersion(boolean latestVersion) {
        this.latestVersion = latestVersion;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }

    public void setDeletedAt(OffsetDateTime deletedAt) {
        this.deletedAt = deletedAt;
    }

    // ===== Business Logic Methods =====

    /**
     * Mark this product as pending (awaiting auction approval).
     */
    public void markPending() {
        this.status = ProductStatus.PENDING;
    }

    /**
     * Mark this product as in use (auction approved and live).
     */
    public void markInUse() {
        this.status = ProductStatus.IN_USE;
    }

    /**
     * Mark this product as sold (auction completed successfully).
     */
    public void markSold() {
        this.status = ProductStatus.SOLD;
    }

    /**
     * Mark this product as available (auction rejected, failed, or cancelled).
     */
    public void markAvailable() {
        this.status = ProductStatus.AVAILABLE;
    }

    /**
     * Soft-delete this product.
     */
    public void softDelete() {
        this.deleted = true;
        this.deletedAt = OffsetDateTime.now(ZoneOffset.ofHours(7));
    }

    /**
     * Mark this product as no longer the latest version (superseded by a new version).
     */
    public void supersede() {
        this.latestVersion = false;
    }

    /**
     * Create a new version of this product with updated details.
     * The new version inherits creator and status from this product.
     */
    public Product createNextVersion(String name, int quantity, String description, Category category) {
        Product newVersion = new Product(name, quantity, description, category);
        newVersion.setCreator(this.creator);
        newVersion.setStatus(this.status);
        newVersion.setRootProductId(this.rootProductId == null ? this.id : this.rootProductId);
        newVersion.setVersionCreatedAt(OffsetDateTime.now(ZoneOffset.ofHours(7)));
        newVersion.setLatestVersion(true);
        newVersion.setDeleted(false);
        return newVersion;
    }
}
